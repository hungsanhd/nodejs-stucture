export default class CreateSummaryDto {
  constructor(
    skills: [string],
    technical_used: [string]
  ) {
    this.skills = skills;
    this.technical_used = technical_used;
  }

  public skills: [string];
  public technical_used: [string];
}