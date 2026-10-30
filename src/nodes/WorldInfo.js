import BaseNode from "./BaseNode.js";

export default class WorldInfo extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("title", new X3D .Fields .SFString ());
      this .fields .set ("info",  new X3D .Fields .MFString ());
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const infoNode = converter .scene .createNode ("WorldInfo");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, infoNode);

      // Assign values.

      infoNode .title = this .fields .get ("title");
      infoNode .info  = this .fields .get ("info");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (infoNode);
      else
         converter .scene .rootNodes .push (infoNode);
   }
};
