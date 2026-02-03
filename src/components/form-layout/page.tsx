"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { useDashboard } from "@/app/context/dashboardContext";
import axios from "axios";
import ImageGallery from "@/components/Showimages/page";
import { toast } from "react-toastify";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const FormLayout = () => {
  const { data } = useDashboard();
  const [article, setArticle] = useState<any>(null);
  // const [files, setFile] = useState<FileList | null>(null);
  const [files, setFiles] = useState<any[]>(data?.filesUrl || []);

  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill && quillRef.current) {
      quill.clipboard.dangerouslyPasteHTML(data?.contain);
      quill.on("text-change", () => {
        setArticleContain(quill.root.innerHTML);
      });
    }
  }, [quill]);

  useEffect(() => {
    if (data) {
      setArticle(data);
      setArticleTitle(data.title);
      setArticleContain(data.contain);
      setFiles(data.files && data.files.length > 0 ? data.files : files);
    }
  }, [data]);
  const [articleTitle, setArticleTitle] = useState<string>(data?.title);
  const [articleContain, setArticleContain] = useState<string>(data?.contain);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setFiles(newFiles);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("media", file);
      });
    }

    // Ajout des autres données
    if (articleTitle != data?.title) formData.append("title", articleTitle);
      formData.append("contain", articleContain);
    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${data?.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setFiles(result.data.data?.files || []);
      toast.success(result.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (index: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/content/${data?.id}/medias/${index}`,
        { withCredentials: true },
      );
      setFiles((prevFiles) => prevFiles.filter((_, indexs) => indexs !== Number(index) - 1));
    } catch (error) {}
  };

  return (
    // <DefaultLayout>
    <>
      <Breadcrumb pageName="Mis à jour" />

      <form onSubmit={handleSubmit}>
        <div className="gap-9 sm:grid-cols-2">
          <div className="mb-10 flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Etape 1
                </h3>
              </div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={articleTitle}
                    onChange={(e: any) => {
                      setArticleTitle(e.target.value);
                    }}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Contenu
                  </label>
                  {/*<Editor>
                    <LoadState title={articleContain} />
                    </Editor>*/}
                  <div
                    className="w-full rounded-xl border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   >
                    <div ref={quillRef} />
                    </div>
                  {/* <textarea
                    rows={6}
                    value={articleContain}
                    onChange={(e: any) => {
                      setArticleContain(e.target.value);
                    }}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            {/* <!-- Sign In Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Etape 2
                </h3>
              </div>

              <div className="p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Ajouter un ou plusieus fichiers (OPTIONNEL)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 mt-5 flex items-center justify-between"></div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {files && files.length > 0 && <ImageGallery files={files} onDelete={handleDelete} />}
      {/* <ImageGallery files={files} onDelete={handleDelete} /> */}
      {/* </DefaultLayout> */}
    </>
  );
};

export default FormLayout;
