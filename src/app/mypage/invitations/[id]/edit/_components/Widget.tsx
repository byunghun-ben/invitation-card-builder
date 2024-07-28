import { WidgetType } from "@/types/invitation";
import InstaCoverWidget from "./InstaCoverWidget";
import InstaMapWidget from "./InstaMapWidget";
import InstaPostWidget from "./InstaPostWidget";

type Props = {
  widget: WidgetType;
};

const Widget = async ({ widget }: Props) => {
  switch (widget.type) {
    case "INSTA_COVER": {
      return <InstaCoverWidget widget={widget} />;
    }

    case "INSTA_MAP": {
      return <InstaMapWidget widget={widget} />;
    }

    case "INSTA_POST": {
      return <InstaPostWidget widget={widget} />;
    }

    default: {
      return null;
    }
  }
};

export default Widget;
