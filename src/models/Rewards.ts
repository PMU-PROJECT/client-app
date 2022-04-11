export type Rewards = {
  given_rewards: GivenRewards[];
  received_rewards: ReceivedRewards[];
};

export type GivenRewards = {
  description: string;
  employee_id: number;
  given_on: string;
  minimum_stamps: number;
  name: string;
  picture: string;
  id: number;
  visitor_id: number;
};

export type ReceivedRewards = {
  description: string;
  employee_id: number;
  given_on: string;
  minimum_stamps: number;
  name: string;
  picture: string;
  reward_id: number;
  visitor_id: number;
};
