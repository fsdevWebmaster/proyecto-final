import { StepModel } from "@models/Step/Step";

export class JourneyHelper {
  static findStepInfoById(stepId: string | StepModel, steps: StepModel[]): StepModel[] {
    const foundSteps: StepModel[] = [];

    if (steps.length === 0) return [];
    const currentStep = steps.find(step => step.id === stepId);

    if (currentStep) {
      foundSteps.push(currentStep);
      const nextStep = steps.find(step => step.id === currentStep.next);

      if (nextStep) {
        foundSteps.push(nextStep);
      }
    }
    return foundSteps;
  }
}