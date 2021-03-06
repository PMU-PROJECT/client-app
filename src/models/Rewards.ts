export type Rewards = {
  eligible_rewards: EligibleRewards[];
  received_rewards: GivenRewards[];
};

export type GivenRewards = {
  description: string;
  employee_id: number;
  given_on: string;
  minimum_stamps: number;
  name: string;
  picture: string;
  reward_id: number;
  visitor_id: number;
};

export type EligibleRewards = {
  description: string;
  reward_id: number;
  minimum_stamps: number;
  name: string;
  picture: string;
};
