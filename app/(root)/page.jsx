import { userOnBoard } from "@/modules/auth/actions";

export default async function DialogDemo() {
  await userOnBoard();
  return (
    <div className="flex justify-center items-center h-screen gap-4">
     
    </div>
  );
}
