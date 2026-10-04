import {
  ButtonItem,
  Navigation,
  PanelSection,
  PanelSectionRow,
  staticClasses
} from "@decky/ui";
import { definePlugin, routerHook } from "@decky/api";
import { FaCircle } from "react-icons/fa";
import { VitaShell } from "./vita/VitaShell";

function Content() {
  const openPSDeck = () => {
    Navigation.Navigate("/psdeck");
    Navigation.CloseSideMenus();
  };

  return (
    <>
      <PanelSection title="PSDeck">
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={openPSDeck}>
            Open PSDeck
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>

      <PanelSection title="Vita rewrite">
        <PanelSectionRow>
          <div>
            PS Vita-style Home and LiveArea prototype.
            <br />
            One Home page for the first hardware milestone.
          </div>
        </PanelSectionRow>
      </PanelSection>
    </>
  );
}

export default definePlugin(() => {
  console.log("[PSDeck] Vita rewrite initialized");

  routerHook.addRoute("/psdeck", VitaShell, {
    exact: true
  });

  return {
    name: "PSDeck",
    titleView: <div className={staticClasses.Title}>PSDeck</div>,
    content: <Content />,
    icon: <FaCircle />,
    onDismount() {
      routerHook.removeRoute("/psdeck");
      console.log("[PSDeck] plugin unloaded");
    }
  };
});
