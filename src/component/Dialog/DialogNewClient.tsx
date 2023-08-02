import { SingleValue } from "react-select";
import { clientStatus, clientsType, getClient } from "../../api/Clients";
import FileInput from "../Input/FileInput";
import InputField from "../Input/InputField";
import SelectInput from "../Input/SelectInput";

type Props = {
  data?: clientsType;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStatus: (option: SingleValue<{ label: string; value: any }>) => void;
  onChangeLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const status = [
  { label: clientStatus[clientStatus.active], value: clientStatus.active },
  { label: clientStatus[clientStatus.inactive], value: clientStatus.inactive },
  { label: clientStatus[clientStatus.pending], value: clientStatus.pending },
  { label: clientStatus[clientStatus.rejected], value: clientStatus.rejected },
  { label: clientStatus[clientStatus.deleted], value: clientStatus.deleted },
];

const DialogNewClient: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="w-full">
        <InputField
          label="Client Name"
          type="text"
          defaultValue={props.data?.name}
          onChange={props.onChangeName}
        />
      </div>
      <div className="w-full">
        <SelectInput
          label="Status"
          options={status}
          defaultValue={
            props.data
              ? {
                  label: clientStatus[props.data.status],
                  value: props.data.status,
                }
              : undefined
          }
          onChange={props.onChangeStatus}
        />
      </div>
      <div className="w-full">
        <FileInput
          label="Logo Client"
          fileType="image"
          readOnly={false}
          onFileChange={props.onChangeLogo}
        />
      </div>
    </div>
  );
};

export default DialogNewClient;
