import { Widget as WidgetType } from "../types";
import InstaMapWidget from "./InstaMapWidget";
import InstaPostWidget from "./InstaPostWidget";

type Props = {
  widget: WidgetType;
  invitationId: number;
  weddingId: number;
};

const Widget = async ({ widget, invitationId, weddingId }: Props) => {
  const isInstaPostWidget = widget.type === "INSTA_POST";

  if (!isInstaPostWidget) {
    return <InstaMapWidget widget={widget} invitationId={invitationId} />;
  }

  return <InstaPostWidget widget={widget} invitationId={invitationId} />;
};

export default Widget;
