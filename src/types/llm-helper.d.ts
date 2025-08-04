declare module '@/lib/llm-helper' {
  export class LLMHelper {
    generate_explanation(problemData: any, solutionData?: any): Promise<string>;
  }
}
