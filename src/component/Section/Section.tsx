import React, { PropsWithChildren } from "react";
import icons from "../../assets/icons/icons";

enum SectionType {
  Edit = "edit",
  Add = "add",
}

interface Props extends PropsWithChildren {
  className?: string;
  isLast?: boolean;
  isEditing?: boolean;
  onEditToggle?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  type?: string;
  title: string;
}

const isMemberOfSectionType = (type: string): type is SectionType => {
  return Object.values(SectionType).includes(type as SectionType);
};

const Section: React.FC<Props> = (props) => {
  let sectionStyle = "flex flex-col border-b-2 border-[#D9D9D9] pb-6 mb-6";

  let type = isMemberOfSectionType(props.type as string)
    ? props.type
    : SectionType.Edit;

  if (props.isLast) {
    sectionStyle = sectionStyle.replace("border-b-2 border-gray-300 pb-6", "");
  }

  return (
    <section className={sectionStyle + " " + props.className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-base">{props.title}</h2>
        <button
          type="button"
          onClick={props.onEditToggle ? props.onEditToggle : () => {}}
          className="flex gap-2"
        >
          <img
            src={!props.isEditing ? icons.edit.gray : icons.cancelEdit.orange}
            alt="edit"
          />
          <span
            style={!props.isEditing ? {} : { color: "#FE7E30" }}
            className="text-sm text-[#989898]"
          >
            {type === SectionType.Edit &&
              (!props.isEditing ? "Edit" : "Cancel")}
            {type === SectionType.Add && "Add"}
          </span>
        </button>
      </div>
      <form
        className="flex flex-col"
        onSubmit={props.onSubmit ? props.onSubmit : () => {}}
      >
        {props.children}
        {props.isEditing && (
          <button
            type="submit"
            className="w-24 rounded-md bg-[#0AB663] text-center text-sm font-semibold font text-[#FAFAFA] shadow-sm px-4 py-2 mt-4 self-start"
          >
            Save
          </button>
        )}
      </form>
    </section>
  );
};

export default Section;
