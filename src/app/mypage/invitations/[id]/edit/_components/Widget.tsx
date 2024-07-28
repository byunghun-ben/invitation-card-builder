import { Widget as WidgetType } from "../types";
import InstaCoverWidget from "./InstaCoverWidget";
import InstaMapWidget from "./InstaMapWidget";
import InstaPostWidget from "./InstaPostWidget";

type Props = {
  widget: WidgetType;
  invitationId: number;
  weddingId: number;
};

const Widget = async ({ widget, invitationId, weddingId }: Props) => {
  switch (widget.type) {
    case "INSTA_MAP": {
      return <InstaMapWidget widget={widget} invitationId={invitationId} />;
    }

    case "INSTA_POST": {
      return <InstaPostWidget widget={widget} invitationId={invitationId} />;
    }

    case "INSTA_COVER": {
      return <InstaCoverWidget widget={widget} invitationId={invitationId} />;
    }

    default: {
      return null;
    }
  }
};

export default Widget;
