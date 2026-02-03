"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { redirect } from "next/navigation";

const FormEditor = () => {
  const [email, setEmail] = useState("");
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsVisibleLoader(true);
      setIsVisible(false);
      console.log(email)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/editor/${email}`,{},
        {
          withCredentials: true,
        },
      );
      setEmail("");
      if (response.data.sucess) {
        setIsVisibleLoader(false);
        setIsVisible(true);
      }
      toast.success(response.data.message);
    } catch (error: any) {
      setIsVisibleLoader(false);
      setIsVisible(true);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajouter un éditeur" />

      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="flex flex-col gap-9">
            {/* <!-- Textarea Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* <div className="text-center py-16">{loading && <BeatLoader />}</div> */}
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Champ
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email de l'éditeur"
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

export default FormEditor;
