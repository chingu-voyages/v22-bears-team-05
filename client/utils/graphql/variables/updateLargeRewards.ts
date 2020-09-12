interface IVars {
  largeRewards: string[];
}

const UPDATE_LARGE_REWARDS_VARIABLES = ({ largeRewards }: IVars) => ({
  largeRewards,
});

export default UPDATE_LARGE_REWARDS_VARIABLES;
