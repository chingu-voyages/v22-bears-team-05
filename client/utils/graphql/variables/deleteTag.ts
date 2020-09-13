interface IVars {
  componentType: 'goal' | 'task' | 'subtask';
  componentId: string;
  tag: string;
}

const DELETE_TAG_VARIABLES = ({ componentType, componentId, tag }: IVars) => ({
  componentType,
  componentId,
  tag,
});

export default DELETE_TAG_VARIABLES;
