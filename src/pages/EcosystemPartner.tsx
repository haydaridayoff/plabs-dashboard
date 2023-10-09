import { ColumnDef } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createPartner,
  deletePartner,
  getPartner,
  partnerStatus,
  partnerType,
  updatePartner,
} from "../api/Partner";
import icons from "../assets/icons/icons";
import { RequestPartnerData } from "../backendApi/api/partner";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogPartner from "../component/Dialog/DialogPartner";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import { usePagination } from "../contexts/usePagination";
import {
  handleDeletePartner,
  handleGetAllPartner,
  handlePostPartner,
} from "../handlers/partnerHandler";
import { ErrorDetails } from "../utils/errorHandler";

const EcosystemPartner: React.FC = () => {
  const {
    limit,
    page,
    totalData,
    totalPage,
    setLimit,
    setPage,
    setTotalData,
    setTotalPage,
    nextPage,
    prevPage,
  } = usePagination(1, 5, 0, 0);

  useEffect(() => {
    const toastLoader = toast.loading("Loading to fetch partner data...", {
      position: "top-right",
    });
    const controller = new AbortController();
    const signal = controller.signal;
    let isCancel = false;

    handleGetAllPartner(limit, page, signal)
      .then((response) => {
        if (isCancel) {
          return;
        }
        const partners: partnerType[] = response.data.map((partner) => {
          return {
            id: partner.guid,
            name: partner.name,
            logo: {
              type: "image",
              src: partner.image,
            },
            status: partnerStatus.off,
          };
        });
        setContent(partners);
        setTotalData(response.paginate.total_data);
        setTotalPage(response.paginate.total_page);
      })
      .catch((errorDetails) => {
        toast.error((errorDetails as ErrorDetails).errorMessage, {
          position: "top-right",
        });
      })
      .finally(() => {
        toast.dismiss(toastLoader);
      });
    return () => {
      controller.abort();
      toast.remove();
      isCancel = true;
    };
  }, [limit, page]);

  const partnerColumnDefs: ColumnDef<partnerType>[] = [
    {
      header: "Name",
      size: 200,
      accessorKey: "name",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      size: 200,
      accessorKey: "logo.src",
      cell: (info) => (
        <div className="h-16 w-16">
          <img
            src={info.getValue() as string}
            className="object-cover h-full w-auto"
            alt=""
          />
        </div>
      ),
    },
    {
      header: "Action",
      size: 80,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button onClick={(e) => editPartnerHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deletePartnerHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const [content, setContent] = useState<partnerType[]>([]);

  const dialog = useContext(DialogFormContext);

  const addPartnerHandler = () => {
    const inputElement = (
      <DialogPartner
        title="Create New Partner"
        onSubmit={(data) => {
          const reqData: RequestPartnerData = {
            name: data.name,
            file: data.file as File,
            status: data.status === partnerStatus.on,
          };
          toast.promise(
            handlePostPartner(limit, page, reqData),
            {
              loading: "Loading...",
              success: (response) => {
                const partners: partnerType[] = response.data.map((partner) => {
                  return {
                    id: partner.guid,
                    name: partner.name,
                    logo: {
                      type: "image",
                      src: partner.image,
                    },
                    status: partner.status
                      ? partnerStatus.on
                      : partnerStatus.off,
                  };
                });
                setContent(partners);
                setTotalData(response.paginate.total_data);
                setTotalPage(response.paginate.total_page);
                return "Partner Created";
              },
              error: (errorDetails) => {
                return (errorDetails as ErrorDetails).errorMessage;
              },
            },
            {
              position: "top-right",
            },
          );
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editPartnerHandler = (data: partnerType) => {
    // const inputElement = (
    //   <DialogPartner
    //     title="Edit Partner"
    //     data={{
    //       name: data.name,
    //       file: null,
    //       status: data.status,
    //     }}
    //     onSubmit={(data) => {
    //       updatePartner(data);
    //       setContent(getPartner().map((item) => item.value));
    //     }}
    //   />
    // );
    // dialog.openDialog(inputElement);
  };

  const deletePartnerHandler = (data: partnerType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Partner"
        message="Are you sure you want to delete this partner?"
        onConfirm={() => {
          toast.promise(
            handleDeletePartner(limit, page, data.id),
            {
              loading: "Loading...",
              success: (response) => {
                const partners: partnerType[] = response.data.map((partner) => {
                  return {
                    id: partner.guid,
                    name: partner.name,
                    logo: {
                      type: "image",
                      src: partner.image,
                    },
                    status: partner.status
                      ? partnerStatus.on
                      : partnerStatus.off,
                  };
                });
                setContent(partners);
                setTotalData(response.paginate.total_data);
                setTotalPage(response.paginate.total_page);
                return "Partner Deleted";
              },
              error: (errorDetails) => {
                return (errorDetails as ErrorDetails).errorMessage;
              },
            },
            {
              position: "top-right",
            },
          );
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section title="Partner" type="add" onClick={addPartnerHandler} isLast>
        <TableBase
          data={content}
          columns={partnerColumnDefs}
          onGoToPage={(page) => setPage(page)}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          onPropsSizeChange={(event) => {
            setLimit(parseInt(event.target.value));
            setPage(1);
          }}
        ></TableBase>
      </Section>
    </>
  );
};

export default EcosystemPartner;
