import BaseNode from "./BaseNode.js";

export default class SpotLight extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("on",          new X3D .Fields .SFBool (true));
      this .fields .set ("intensity",   new X3D .Fields .SFFloat (1));
      this .fields .set ("color",       new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("location",    new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("direction",   new X3D .Fields .SFVec3f (0, 0, -1));
      this .fields .set ("dropOffRate", new X3D .Fields .SFFloat ());
      this .fields .set ("cutOffAngle", new X3D .Fields .SFFloat (0.785398));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const lightNode = converter .scene .createNode ("SpotLight");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, lightNode);

      // Assign values.

      lightNode .on          = this .fields .get ("on");
      lightNode .intensity   = this .fields .get ("intensity");
      lightNode .color       = this .fields .get ("color");
      lightNode .location    = this .fields .get ("location");
      lightNode .direction   = this .fields .get ("direction");
      lightNode .cutOffAngle = this .fields .get ("cutOffAngle");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (lightNode);
      else
         converter .scene .rootNodes .push (lightNode);
   }
};
