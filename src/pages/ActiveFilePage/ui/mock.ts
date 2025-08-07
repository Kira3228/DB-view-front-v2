import TActiveFile from "@/shared/types/ActiveFiles/TActiveFile";

export const mockActiveFiles: TActiveFile[] = [
    {
        id: 1,
        inode: 1001,
        filePath: "/var/log/app1.log",
        fileSize: 12456,
        maxChainDepth: 4,
        minChainDepth: 2,
        status: "active"
    },
    {
        id: 2,
        inode: 1002,
        filePath: "/var/log/app2.log",
        fileSize: 28370,
        maxChainDepth: 3,
        minChainDepth: 1,
        status: "closed"
    },
    {
        id: 3,
        inode: 1003,
        filePath: "/home/user/file1.txt",
        fileSize: 9870,
        maxChainDepth: 7,
        minChainDepth: 5,
        status: "active"
    },
    {
        id: 4,
        inode: 1004,
        filePath: "/tmp/test234.tmp",
        fileSize: 45678,
        maxChainDepth: 2,
        minChainDepth: 2,
        status: "archived"
    },
    {
        id: 5,
        inode: 1005,
        filePath: "/etc/sample.conf",
        fileSize: 1200,
        maxChainDepth: 6,
        minChainDepth: 3,
        status: "closed"
    },
    {
        id: 6,
        inode: 1006,
        filePath: "/usr/share/data/file6.db",
        fileSize: 66543,
        maxChainDepth: 8,
        minChainDepth: 6,
        status: "active"
    },
    {
        id: 7,
        inode: 1007,
        filePath: "/opt/app/data/datafile7.bin",
        fileSize: 45012,
        maxChainDepth: 3,
        minChainDepth: 1,
        status: "active"
    },
    {
        id: 8,
        inode: 1008,
        filePath: "/var/log/app8.log",
        fileSize: 1234,
        maxChainDepth: 1,
        minChainDepth: 0,
        status: "active"
    },
    {
        id: 9,
        inode: 1009,
        filePath: "/root/hidden/secretfile",
        fileSize: 87654,
        maxChainDepth: 9,
        minChainDepth: 5,
        status: "archived"
    },
    {
        id: 10,
        inode: 1010,
        filePath: "/data/backup/file10.bak",
        fileSize: 99011,
        maxChainDepth: 4,
        minChainDepth: 2,
        status: "active"
    },
    {
        id: 11,
        inode: 1011,
        filePath: "/mnt/nfs/remote11.img",
        fileSize: 177700,
        maxChainDepth: 1,
        minChainDepth: 1,
        status: "closed"
    },
    {
        id: 12,
        inode: 1012,
        filePath: "/var/tmp/scratch12",
        fileSize: 3000,
        maxChainDepth: 2,
        minChainDepth: 1,
        status: "active"
    },
    {
        id: 13,
        inode: 1013,
        filePath: "/var/cache/some.cache",
        fileSize: 8400,
        maxChainDepth: 4,
        minChainDepth: 2,
        status: "archived"
    },
    {
        id: 14,
        inode: 1014,
        filePath: "/srv/web/assets/img14.png",
        fileSize: 12800,
        maxChainDepth: 5,
        minChainDepth: 2,
        status: "active"
    },
    {
        id: 15,
        inode: 1015,
        filePath: "/media/usb/file15.mp4",
        fileSize: 887001,
        maxChainDepth: 2,
        minChainDepth: 1,
        status: "closed"
    },
    {
        id: 16,
        inode: 1016,
        filePath: "/data/store16.json",
        fileSize: 6500,
        maxChainDepth: 6,
        minChainDepth: 5,
        status: "active"
    },
    {
        id: 17,
        inode: 1017,
        filePath: "/external/drive17.iso",
        fileSize: 804900,
        maxChainDepth: 11,
        minChainDepth: 10,
        status: "archived"
    },
    {
        id: 18,
        inode: 1018,
        filePath: "/root/tempfile18",
        fileSize: 17123,
        maxChainDepth: 1,
        minChainDepth: 0,
        status: "active"
    },
    {
        id: 19,
        inode: 1019,
        filePath: "/dev/null",
        fileSize: 0,
        maxChainDepth: 0,
        minChainDepth: 0,
        status: "closed"
    },
    {
        id: 20,
        inode: 1020,
        filePath: "/var/log/lastfile20.log",
        fileSize: 2222,
        maxChainDepth: 3,
        minChainDepth: 2,
        status: "active"
    }
];
