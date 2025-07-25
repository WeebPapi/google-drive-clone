"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Card, CardContent } from "~/components/ui/card";
import {
  Search,
  Plus,
  Grid3X3,
  List,
  Upload,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  MoreVertical,
  Download,
  Share,
  Trash2,
  Star,
  Clock,
  HardDrive,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  Home,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type:
    | "folder"
    | "document"
    | "image"
    | "video"
    | "audio"
    | "archive"
    | "other";
  size?: string;
  modified: string;
  url?: string;
  children?: FileItem[];
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "2 days ago",
    children: [
      {
        id: "1-1",
        name: "Resume.pdf",
        type: "document",
        size: "245 KB",
        modified: "1 week ago",
        url: "#",
      },
      {
        id: "1-2",
        name: "Project Proposal.docx",
        type: "document",
        size: "1.2 MB",
        modified: "3 days ago",
        url: "#",
      },
      {
        id: "1-3",
        name: "Meeting Notes",
        type: "folder",
        modified: "1 day ago",
        children: [
          {
            id: "1-3-1",
            name: "Q1 Planning.txt",
            type: "document",
            size: "12 KB",
            modified: "1 day ago",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    children: [
      {
        id: "2-1",
        name: "vacation-2024.jpg",
        type: "image",
        size: "2.4 MB",
        modified: "1 week ago",
        url: "#",
      },
      {
        id: "2-2",
        name: "profile-pic.png",
        type: "image",
        size: "856 KB",
        modified: "2 weeks ago",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    name: "Videos",
    type: "folder",
    modified: "3 weeks ago",
    children: [
      {
        id: "3-1",
        name: "presentation-demo.mp4",
        type: "video",
        size: "45 MB",
        modified: "3 weeks ago",
        url: "#",
      },
    ],
  },
  {
    id: "4",
    name: "Budget Spreadsheet.xlsx",
    type: "document",
    size: "89 KB",
    modified: "5 days ago",
    url: "#",
  },
  {
    id: "5",
    name: "Music Collection.zip",
    type: "archive",
    size: "156 MB",
    modified: "1 month ago",
    url: "#",
  },
  {
    id: "6",
    name: "background-music.mp3",
    type: "audio",
    size: "4.2 MB",
    modified: "2 weeks ago",
    url: "#",
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return <Folder className="h-8 w-8 text-blue-500" />;
    case "document":
      return <FileText className="h-8 w-8 text-red-500" />;
    case "image":
      return <ImageIcon className="h-8 w-8 text-green-500" />;
    case "video":
      return <Video className="h-8 w-8 text-purple-500" />;
    case "audio":
      return <Music className="h-8 w-8 text-orange-500" />;
    case "archive":
      return <Archive className="h-8 w-8 text-yellow-500" />;
    default:
      return <FileText className="h-8 w-8 text-gray-500" />;
  }
};

export default function Page() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"]);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === "folder" && folder.children) {
      setCurrentPath([...currentPath, folder.name]);
      setCurrentItems(folder.children);
    }
  };

  const navigateToPath = (index: number) => {
    if (index === 0) {
      setCurrentPath(["My Drive"]);
      setCurrentItems(mockData);
    } else {
      // Navigate to specific path level
      const newPath = currentPath.slice(0, index + 1);
      setCurrentPath(newPath);
      // This would need more complex logic to navigate to the correct folder
      // For now, just go back to root
      if (newPath.length === 1) {
        setCurrentItems(mockData);
      }
    }
  };

  const handleUpload = () => {
    // Mock upload functionality
    alert("Upload functionality would be implemented here!");
  };

  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500">
              <HardDrive className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-medium text-gray-700">Drive</span>
          </div>

          <div className="mx-4 max-w-2xl flex-1">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search in Drive"
                className="border-0 bg-gray-100 pl-10 focus:bg-white focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="min-h-screen w-64 border-r border-gray-200 p-4">
          <Button
            onClick={handleUpload}
            className="mb-6 w-full bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-3 h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-3 h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-3 h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="mr-3 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash2 className="mr-3 h-4 w-4" />
              Trash
            </Button>
          </nav>

          <div className="mt-8">
            <div className="mb-2 text-sm text-gray-600">Storage</div>
            <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: "45%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">6.8 GB of 15 GB used</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => navigateToPath(index)}
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  {path}
                </button>
                {index < currentPath.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* File Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() =>
                    item.type === "folder"
                      ? navigateToFolder(item)
                      : window.open(item.url, "_blank")
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      {getFileIcon(item.type)}
                      <div className="mt-2 w-full truncate text-sm font-medium">
                        {item.name}
                      </div>
                      {item.size && (
                        <div className="mt-1 text-xs text-gray-500">
                          {item.size}
                        </div>
                      )}
                      <div className="mt-1 text-xs text-gray-400">
                        {item.modified}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Add to starred
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Move to trash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 hover:bg-gray-50"
                  onClick={() =>
                    item.type === "folder"
                      ? navigateToFolder(item)
                      : window.open(item.url, "_blank")
                  }
                >
                  {getFileIcon(item.type)}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.modified}</div>
                  </div>
                  {item.size && (
                    <div className="w-20 text-right text-sm text-gray-500">
                      {item.size}
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Add to starred
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Move to trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-2 text-gray-400">No files found</div>
              <div className="text-sm text-gray-500">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "This folder is empty"}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
