interface IVars {
  componentType: 'goal' | 'task' | 'subtask';
  componentId: string;
  newTag: string;
}

const ADD_TAG_VARIABLES = ({ componentType, componentId, newTag }: IVars) => ({
  componentType,
  componentId,
  newTag,
});

export default ADD_TAG_VARIABLES;
