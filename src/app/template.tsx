import "../styles/global.styles.scss";
import { BottomCleverBar } from "@/widgets/BottomCleverBar";

// template потому что BottomCleverBar хоть и клиентский, но в layout.tsx не ререндерится, а template как раз для ререндера и нужен
export default async function RootTemplate(props: any) {
  return (
    <>
      {props.children}
      <BottomCleverBar />
    </>
  );
}
