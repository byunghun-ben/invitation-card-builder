import { WidgetType } from "@/types/invitation";
import InstaCoverWidget from "./InstaCoverWidget";
import InstaMapWidget from "./InstaMapWidget";
import InstaPostWidget from "./InstaPostWidget";

type Props = {
  widget: WidgetType;
  index: number;
};

const Widget = async ({ widget, index }: Props) => {
  switch (widget.type) {
    case "INSTA_COVER": {
      return <InstaCoverWidget widget={widget} index={index} />;
    }

    case "INSTA_MAP": {
      return <InstaMapWidget widget={widget} index={index} />;
    }

    case "INSTA_POST": {
      return <InstaPostWidget widget={widget} index={index} />;
    }

    default: {
      return null;
    }
  }
};

export default Widget;
