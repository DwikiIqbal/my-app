import Link from "next/link";
import Format from "../../layout/format";
import Section from "@/components/section";


export default function Home() {
  return (
    <>
      <div className="pb-10 text-neutral-focus">
        <Format>
          <Section></Section>       
         </Format>
      </div>
    </>
  );
}
