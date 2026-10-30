
export default class BaseNode
{
   constructor (X3D, typeName, name)
   {
      this .X3D      = X3D;
      this .typeName = typeName;
      this .name     = name;
      this .fields   = new Map ();

      this .fields .set ("children", [ ]);
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         const transform = converter .scene .etNamedNode (this .name);

         // Add root node if needed or add as child.

         if (converter .transforms .length)
            converter .groups .at (-1) .children .push (transform);
         else
            converter .scene .rootNodes .push (transform);

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert ()
   {
      console .log ("VRML1Parser: convert:", this .typeName);
   }
};
