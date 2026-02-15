"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const FormElements = () => {
  // const {content} = useDashboard();
  const [title, setTitle] = useState("");
  const [contain, setContain] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [files, setFile] = useState<FileList | null>(null);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill && quillRef.current) {
      quill.on("text-change", () => {
        setContain(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files);
    }
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const route = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("media", file);
      });
    }

    // Ajout des autres données
    formData.append("title", title);
    formData.append("contain", contain);
    const type = selectedOption;
    try {
      setIsVisibleLoader(true);
      setIsVisible(false);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/content/${type.toLowerCase()}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.sucess) {
        setIsVisibleLoader(false);
        setIsVisible(true);
        toast.success(response.data.message);
      }

      if(response.data.sucess == false) {
        if(response.data.message == "Wrong credentials provided") {
          await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
            {},
            {
              withCredentials: true,
            },
          );
          route.push("/auth/signin");
        }
      }
    } catch (error: any) {
      setIsVisibleLoader(false);
      setIsVisible(true);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajouter un article ou un projet" />

      <form onSubmit={handleSubmit}>
        <div className="gap-9 sm:grid-cols-2">
          <div className="mb-10 flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Etape 1
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="mb-4">
                  {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Titre
                  </label> */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Titre <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      value={title}
                      type="text"
                      onChange={(e: any) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Titre de l'article"
                      required
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="pt-4">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Contenu <span className="text-red-500 font-bold">*</span>
                      </label>
                      {/*<Editor />*/}
                      <div
                        className="w-full rounded-xl border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <div ref={quillRef} />
                        </div>
                      {/* <p>Texte entré : {contain}</p> */}
                      {/* <textarea
                        value={contain}
                        onChange={(e: any) => {
                          setContain(e.target.value);
                        }}
                        rows={6}
                        placeholder="Entrez le contenu ou description de l'article/projet"
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            {/* <!-- Textarea Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Etape 2
                </h3>
              </div>
              {/* <div className="flex flex-col gap-5.5 p-6.5">
              <h3 className="font-medium text-black dark:text-white">
                Select input
              </h3>
            </div> */}
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Selectionner Article ou Projet <span className="text-red-500 font-bold">*</span>
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>

                    <select
                      value={selectedOption}
                      onChange={(e) => {
                        setSelectedOption(e.target.value);
                        changeTextColor();
                      }}
                      required
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected ? "text-black dark:text-white" : ""
                      }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        Selectionner le type (Article/Projet)
                      </option>
                      <option
                        value="article"
                        className="text-body dark:text-bodydark"
                      >
                        Article
                      </option>
                      <option
                        value="project"
                        className="text-body dark:text-bodydark"
                      >
                        Projet
                      </option>
                      {/* <option value="Canada" className="text-body dark:text-bodydark">
            Canada
          </option> */}
                    </select>

                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                {/* <MultiSelect id="multiSelect" /> */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Ajouter un ou plusieus fichiers
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-5">
                  {isVisibleLoader && (
                    <div className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                      <BeatLoader color="white" className="text-center" />
                    </div>
                  )}
                  {isVisible && (
                    <input
                      type="submit"
                      value="Ajouter"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
