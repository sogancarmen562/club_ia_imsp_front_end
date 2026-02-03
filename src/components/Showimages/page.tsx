// import { useState } from "react";
// import { X } from "lucide-react"; // Icône de croix

// interface ImageGalleryProps {
//   files: string[];
//   onDelete: (fileName: string) => void;
// }

// const ImageGallery: React.FC<ImageGalleryProps> = ({ files, onDelete }) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <div>
//       {/* Grille des images */}
//       <div className="grid grid-cols-3 gap-4 p-4">
//         {files?.map((url, index: any) => (
//           <div key={index} className="group relative">
//             {/* Image */}
//             <img
//               src={url.toString()}
//               alt="image"
//               className="h-32 w-full cursor-pointer rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
//               // onClick={() => setSelectedImage(img.files_names)}
//             />
//             <p className="mt-2 text-xs text-gray-700 break-all">{url}</p>

//             {/* Bouton de suppression */}
//             <button
//               className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
//               onClick={() => onDelete(index)}
//             >
//               <X size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;


// components/Showimages/page.tsx
import React from "react";

interface ImageGalleryProps {
  files: { id: string; url: string }[] | string[]; // selon la structure de tes fichiers
  onDelete?: (fileId: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files, onDelete }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {files && files.length > 0 ? (
        files.map((file: any, index: number) => {
          // si files est un tableau d'URLs pures, file = string
          const url = typeof file === "string" ? file : file.url;
          const id = typeof file === "string" ? index : file.id;

          return (
            <div key={id} className="relative group">
              <img
                src={url}
                key={index}
                alt="image"
                className="w-full h-48 object-cover rounded-lg"
              />
              {onDelete && (
                <button
                  onClick={() => onDelete((index + 1).toString())}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Supprimer
                </button>
              )}
            </div>
          );
        })
      ) : (
        <p>Aucune image</p>
      )}
    </div>
  );
};

export default ImageGallery;
