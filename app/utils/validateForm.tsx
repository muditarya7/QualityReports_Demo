import type { QuestionData, QuestionType, QuestionValue } from '../types/forms';

export type ValidationErrorType =
  | 'required'
  | 'type'
  | 'format'
  | 'range'
  | 'options'
  | 'multiselect'
  | 'server'
  | 'network';

export type ValidationError = {
  questionId: number; // -1 for global errors
  description: string;
  type: ValidationErrorType;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

function normalizeText(v: string): string {
  return v.trim().replace(/\s+/g, ' ');
}

function isValidDatetimeLocal(v: string): boolean {
  if (typeof v !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v)) return false;
  const d = new Date(v);
  return !Number.isNaN(d.getTime());
}

function inRangeISO(v: string, minISO?: string, maxISO?: string): boolean {
  const t = new Date(v).getTime();
  if (Number.isNaN(t)) return false;

  if (minISO) {
    const minT = new Date(minISO).getTime();
    if (!Number.isNaN(minT) && t < minT) return false;
  }
  if (maxISO) {
    const maxT = new Date(maxISO).getTime();
    if (!Number.isNaN(maxT) && t > maxT) return false;
  }
  return true;
}

function isEmptyValue(type: QuestionType, value: QuestionValue): boolean {
  if (value === null || value === undefined) return true;

  if (type === 'text' || type === 'dropdown' || type === 'datetime') {
    return typeof value !== 'string' || value.trim().length === 0;
  }

  if (type === 'number') {
    if (typeof value === 'number') return Number.isNaN(value);
    if (typeof value === 'string') return value.trim().length === 0;
    return true;
  }

  if (type === 'boolean') {
    return typeof value !== 'boolean';
  }

  if (type === 'multiselect') {
    return !Array.isArray(value) || value.length === 0;
  }

  return false;
}

function parseNumber(raw: unknown): { ok: boolean; num?: number } {
  if (typeof raw === 'number') {
    return Number.isNaN(raw) ? { ok: false } : { ok: true, num: raw };
  }
  if (typeof raw !== 'string') return { ok: false };

  const s = raw.trim();
  if (s.length === 0) return { ok: false };

  // strict numeric (prevents parseFloat("2abc") => 2)
  if (!/^-?\d+(\.\d+)?$/.test(s)) return { ok: false };

  const n = Number(s);
  if (Number.isNaN(n)) return { ok: false };
  return { ok: true, num: n };
}

export function validateForm(questions: QuestionData[]): ValidationResult {
  const errors: ValidationError[] = [];

  for (const q of questions) {
    const rules = q.validation ?? {};
    const required = q.required ?? rules.required ?? false;

    // required gate
    if (required && isEmptyValue(q.type, q.value)) {
      errors.push({
        questionId: q.id,
        description: q.description,
        type: 'required',
        message: 'Required field is missing.',
      });
      continue;
    }

    // optional + empty => skip deeper validation
    if (!required && isEmptyValue(q.type, q.value)) continue;

    switch (q.type) {
      case 'text': {
        if (typeof q.value !== 'string') {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'type',
            message: 'Expected a text value.',
          });
          break;
        }

        const cfg = rules.text ?? {};
        const v = cfg.normalize ? normalizeText(q.value) : q.value;

        if (cfg.minLen !== undefined && v.length < cfg.minLen) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'format',
            message: `Must be at least ${cfg.minLen} characters.`,
          });
        }
        if (cfg.maxLen !== undefined && v.length > cfg.maxLen) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'format',
            message: `Must be at most ${cfg.maxLen} characters.`,
          });
        }
        if (cfg.pattern && !cfg.pattern.test(v)) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'format',
            message: 'Text format is invalid.',
          });
        }
        if (cfg.forbidPattern && cfg.forbidPattern.test(v)) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'format',
            message: 'Contains forbidden characters.',
          });
        }
        break;
      }

      case 'number': {
        const parsed = parseNumber(q.value);

        if (!parsed.ok || parsed.num === undefined) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'type',
            message: 'Expected a valid number.',
          });
          break;
        }

        const n = parsed.num;
        const cfg = rules.number ?? {};

        if (cfg.integerOnly && !Number.isInteger(n)) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'format',
            message: 'Must be an integer.',
          });
        }
        if (cfg.min !== undefined && n < cfg.min) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'range',
            message: `Must be ≥ ${cfg.min}.`,
          });
        }
        if (cfg.max !== undefined && n > cfg.max) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'range',
            message: `Must be ≤ ${cfg.max}.`,
          });
        }
        break;
      }

      case 'boolean': {
        if (typeof q.value !== 'boolean') {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'type',
            message: 'Expected Yes/No selection.',
          });
        }
        break;
      }

      case 'dropdown': {
        if (typeof q.value !== 'string') {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'type',
            message: 'Expected a single selected option.',
          });
          break;
        }

        const cfg = rules.options ?? {};
        const enforce = cfg.enforce ?? true;

        if (enforce) {
          const allowed = q.options ?? [];
          if (!allowed.includes(q.value)) {
            errors.push({
              questionId: q.id,
              description: q.description,
              type: 'options',
              message: 'Selected value is not in allowed options.',
            });
          }
        }
        break;
      }

      case 'multiselect': {
        if (!Array.isArray(q.value)) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'type',
            message: 'Expected a list of selected options.',
          });
          break;
        }

        const cfg = rules.options ?? {};
        const enforce = cfg.enforce ?? true;
        const allowed = q.options ?? [];

        if (cfg.unique ?? true) {
          const uniq = new Set(q.value);
          if (uniq.size !== q.value.length) {
            errors.push({
              questionId: q.id,
              description: q.description,
              type: 'multiselect',
              message: 'Duplicate selections are not allowed.',
            });
          }
        }

        if (cfg.minSelected !== undefined && q.value.length < cfg.minSelected) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'multiselect',
            message: `Select at least ${cfg.minSelected}.`,
          });
        }
        if (cfg.maxSelected !== undefined && q.value.length > cfg.maxSelected) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'multiselect',
            message: `Select at most ${cfg.maxSelected}.`,
          });
        }

        if (enforce) {
          for (const v of q.value) {
            if (typeof v !== 'string' || !allowed.includes(v)) {
              errors.push({
                questionId: q.id,
                description: q.description,
                type: 'options',
                message: 'One or more selected values are not allowed.',
              });
              break;
            }
          }
        }

        break;
      }

      case 'datetime': {
        if (typeof q.value !== 'string') {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'type',
            message: 'Expected a date/time value.',
          });
          break;
        }

        const cfg = rules.datetime ?? {};
        const enforceValid = cfg.enforceValid ?? true;

        if (enforceValid && !isValidDatetimeLocal(q.value)) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'format',
            message: 'Invalid date/time format.',
          });
          break;
        }

        if (
          (cfg.minISO || cfg.maxISO) &&
          !inRangeISO(q.value, cfg.minISO, cfg.maxISO)
        ) {
          errors.push({
            questionId: q.id,
            description: q.description,
            type: 'range',
            message: 'Date/time is outside the allowed range.',
          });
        }

        break;
      }

      default:
        break;
    }
  }

  return { isValid: errors.length === 0, errors };
}
