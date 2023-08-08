import useTimeSensitiveGreeting from "~/hooks/useTimeSensitiveGreeting";
import SettingsButton from "../settingsButton";
import ThemeToggle from "../ui/themeToggle";

const DashboardHeader = () => {
  const greeting = useTimeSensitiveGreeting();

  return (
    <div className="mb-10 grid grid-cols-3 items-center py-7">
      <h1 className="text-accent col-start-1 text-5xl">{greeting}</h1>
      <div className="col-start-3 flex justify-end self-end">
        <ThemeToggle />
        <SettingsButton className="ml-2 justify-self-end" />
      </div>
    </div>
  );
};

export default DashboardHeader;
