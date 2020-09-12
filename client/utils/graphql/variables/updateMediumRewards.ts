interface IVars {
  mediumRewards: string[];
}

const UPDATE_MEDIUM_REWARDS_VARIABLES = ({ mediumRewards }: IVars) => ({
  mediumRewards,
});

export default UPDATE_MEDIUM_REWARDS_VARIABLES;
