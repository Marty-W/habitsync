import GoBackButton from "../ui/goBackButton";

interface Props {
  title: string;
  children: React.ReactNode;
}
const SubSettingsPage = ({ title, children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col px-4 pt-3">
      <div className="grid grid-cols-[100px_1fr_100px] items-center">
        <GoBackButton />
        <h1 className="text-accent-foreground col-start-2 my-5 text-center text-xl">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default SubSettingsPage;
