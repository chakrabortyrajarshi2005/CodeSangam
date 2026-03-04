
import { UserButton } from "@clerk/nextjs";
import { userOnBoard } from "@/modules/auth/actions";

export default async function DialogDemo() {
  await userOnBoard();
  return (
    <div className="flex flex-column justify-center items-center h-screen gap-4">
      <UserButton />
    </div>
  );
}
