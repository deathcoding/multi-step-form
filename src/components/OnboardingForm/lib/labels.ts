import type { Step1Data } from '../steps/Step1Personal/schema';
import type { Step2Data } from '../steps/Step2Role/schema';
import { dietaryRestrictionsOptions } from '../steps/Step4Comments/schema';

export const genderLabels: Record<Step1Data['gender'], string> = {
  Male: 'Мужской',
  Female: 'Женский',
  Other: 'Другой',
};

export const officeLocationLabels: Record<Step2Data['officeLocation'], string> = {
  Remote: 'Удалённо',
  Moscow: 'Москва',
  London: 'Лондон',
  'New York': 'Нью-Йорк',
};

export const dietaryLabels: Record<(typeof dietaryRestrictionsOptions)[number], string> = {
  None: 'Нет',
  Vegetarian: 'Вегетарианское',
  Vegan: 'Веганское',
  Halal: 'Халяль',
};
