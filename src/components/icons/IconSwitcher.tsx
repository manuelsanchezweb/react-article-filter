import { IconQwik, IconReact, IconVue } from "./Icons";

export const IconSwitcher = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  function renderIcon(icon: string) {
    switch (icon) {
      case "react":
        return <IconReact className={className} />;
      case "vue":
        return <IconVue className={className} />;
      case "qwik":
        return <IconQwik className={className} />;

      default:
        return <IconReact className={className} />;
    }
  }

  return renderIcon(icon);
};
