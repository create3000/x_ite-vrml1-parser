import BaseNode from "./BaseNode.js";

export default class IndexedFaceSet extends BaseNode
{
   constructor (X3D, name)
   {
      super (X3D, "IndexedFaceSet", name);

      this .fields .set ("vertexOrdering", new X3D .Fields .SFString ("COUNTERCLOCKWISE"));

      this .fields .set ("coordIndex",        new X3D .Fields .MFInt32 (0));
      this .fields .set ("materialIndex",     new X3D .Fields .MFInt32 (-1));
      this .fields .set ("normalIndex",       new X3D .Fields .MFInt32 (-1)),
      this .fields .set ("textureCoordIndex", new X3D .Fields .MFInt32 (-1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("IndexedFaceSet");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, shapeNode);

      // Assign values.

      shapeNode .appearance = appearanceNode;
      shapeNode .geometry   = geometryNode;

      appearanceNode .material         = converter .materials         .at (-1);
      appearanceNode .texture          = converter .textures          .at (-1);
      appearanceNode .textureTransform = converter .textureTransforms .at (-1);

      if (converter .shapeHints .length)
      {
         geometryNode .ccw         = converter .shapeHints .at (-1) .ccw;
         geometryNode .solid       = converter .shapeHints .at (-1) .solid;
         geometryNode .convex      = converter .shapeHints .at (-1) .convex;
         geometryNode .creaseAngle = converter .shapeHints .at (-1) .creaseAngle;
      }

      // XXX: Always set solid to false.
      geometryNode .solid = false;

      if (converter .normalBindings .length)
      {
         if (converter .normalBindings .at (-1) .value === "OVERALL")
         {
            for (const index of this .fields .get ("coordIndex"))
               geometryNode .normalIndex .push (index < 0 ? -1 : 0);
         }
         else if (converter .normalBindings .at (-1) .value === "PER_FACE")
         {
            geometryNode .normalPerVertex = false;
         }
         else if (converter .normalBindings .at (-1) .value === "PER_FACE_INDEXED")
         {
            geometryNode .normalPerVertex = false;
            geometryNode .normalIndex     = this .fields .get ("normalIndex");
         }
         else if (converter .normalBindings .at (-1) .value === "PER_VERTEX")
         ;
         else //if (converter .normalBindings .at (-1) .value === "PER_VERTEX_INDEXED")
         {
            geometryNode .normalIndex = this .fields .get ("normalIndex");
         }
      }
      else
      {
         geometryNode .normalIndex = this .fields .get ("normalIndex");
      }

      geometryNode .texCoordIndex = this .fields .get ("textureCoordIndex");
      geometryNode .coordIndex    = this .fields .get ("coordIndex");

      geometryNode .texCoord = converter .texCoords .at (-1);
      geometryNode .normal   = converter .normals   .at (-1);
      geometryNode .coord    = converter .coords    .at (-1);

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};
