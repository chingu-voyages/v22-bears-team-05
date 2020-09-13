interface IVars {
  smallRewards: string[];
}

const UPDATE_SMALL_REWARDS_VARIABLES = ({ smallRewards }: IVars) => ({
  smallRewards,
});

export default UPDATE_SMALL_REWARDS_VARIABLES;
