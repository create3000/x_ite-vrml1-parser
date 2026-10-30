import BaseNode from "./BaseNode.js";

export default class Info extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("string", new X3D .Fields .SFString ());
   }

   convert (converter)
   {
      // NO USE!

      // Create nodes.

      if (converter .transforms .length)
      {
         const metadataNode = converter .scene .createNode ("MetadataString");

         // Set name.

         if (this .name)
            converter .scene .updateNamedNode (this .name, metadataNode);

         // Assign values.

         metadataNode .name      = "Info";
         metadataNode .reference = converter .scene .getBrowser () .providerURL;
         metadataNode .value     = [ this .fields .get ("string") .getValue () ];

         converter .groups .at (-1) .metadata = metadataNode;
      }
      else
      {
         // Create nodes.

         const infoNode = converter .scene .createNode ("WorldInfo");

         // Set name.

         // Assign values.

         infoNode .title = "Info";
         infoNode .info  = [ this .fields .get ("string") .getValue () ];

         converter .scene .rootNodes .push (infoNode);
      }
   }
};
