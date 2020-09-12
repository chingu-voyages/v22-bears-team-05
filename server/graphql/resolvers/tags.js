const getComponent = require("../utils/getComponent");

module.exports = {
  Mutation: {
    async addTag(_, { componentType, componentId, newTag }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        const component = await getComponent(componentType, componentId);
        if (!component)
          throw new Error(
            "Cannot find a component with that name and type combination",
          );
        const tags = component.tags;
        const baseTagProperties = {
          tagName: newTag,
          componentType,
          componentId,
        };
        if (tags.includes(newTag))
          return { ...baseTagProperties, status: "already exists" };
        tags.push(newTag);
        await component.save();
        return { ...baseTagProperties, status: "added" };
      } catch (err) {
        throw new Error(err);
      }
    },
    async modifyTag(
      _,
      { componentType, oldTag, newTag, componentId },
      context,
    ) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        const component = await getComponent(componentType, componentId);
        if (!component)
          throw new Error(
            "Cannot find a component with that name and type combination",
          );
        if (!component.tags.includes(oldTag))
          throw new Error("old tag does not exist");
        if (component.tags.includes(newTag))
          throw new Error("new tag already exists");
        component.tags = component.tags.map((tag) =>
          tag !== oldTag ? tag : newTag,
        );
        await component.save();
        return {
          tagName: newTag,
          componentId,
          componentType,
          status: "renamed",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteTag(_, { componentType, tag, componentId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        const component = await getComponent(componentType, componentId);
        if (!component)
          throw new Error(
            "Cannot find a component with that name and type combination",
          );
        if (!component.tags.includes(tag))
          throw new Error("tag does not exist");
        component.tags = component.tags.filter((tagName) => tag !== tagName);
        await component.save();
        return { tagName: tag, componentId, componentType, status: "deleted" };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
