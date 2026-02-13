// import { Button } from "@/components/ui/button"
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  moveToDashboard: () => void;
  logout: () => void;
}

export function DropdownMenuBasic({ logout, moveToDashboard }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger style={{zIndex:"50"}} asChild>
        <Button style={{cursor:"pointer"}} variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel
            style={{ cursor: "pointer" }}
            onClick={moveToDashboard}
          >
            My Dashboard
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem  style={{ cursor: "pointer" }} onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
