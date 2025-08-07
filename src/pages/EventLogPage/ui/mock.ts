// import { TEventLogData } from "@/shared/types/EventLogs";

// export const mockEventLogData: TEventLogData[] = [
//     {
//         id: 1,
//         eventType: "creation",
//         eventData: "File created in documents directory",
//         source: "System",
//         timestamp: "2025-08-04 14:25:30",
//         relatedFileId: {
//             id: 1001,
//             fileSystemId: "fs1",
//             filePath: "/home/user/documents/report.pdf",
//             fileName: "report.pdf",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10001,
//             pid: 1234,
//             executablePath: "/usr/bin/libreoffice"
//         }
//     },
//     {
//         id: 2,
//         eventType: "access",
//         eventData: "User accessed sensitive file",
//         source: "User",
//         timestamp: "2025-08-04 13:45:12",
//         relatedFileId: {
//             id: 1002,
//             fileSystemId: "fs2",
//             filePath: "/etc/passwd",
//             fileName: "passwd",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10002,
//             pid: 5678,
//             executablePath: "/bin/cat"
//         }
//     },
//     {
//         id: 3,
//         eventType: "deletion",
//         eventData: "Temporary cache files removed",
//         source: "Service",
//         timestamp: "2025-08-04 12:30:45",
//         relatedFileId: {
//             id: 1003,
//             fileSystemId: "fs3",
//             filePath: "/tmp/cache/temp.log",
//             fileName: "temp.log",
//             status: "deleted"
//         },
//         relatedProcessId: {
//             id: 10003,
//             pid: 9876,
//             executablePath: "/usr/bin/systemd-tmpfiles"
//         }
//     },
//     {
//         id: 4,
//         eventType: "modification",
//         eventData: "Configuration file updated",
//         source: "User",
//         timestamp: "2025-08-04 11:15:22",
//         relatedFileId: {
//             id: 1004,
//             fileSystemId: "fs1",
//             filePath: "/etc/nginx/nginx.conf",
//             fileName: "nginx.conf",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10004,
//             pid: 4321,
//             executablePath: "/usr/bin/vim"
//         }
//     },
//     {
//         id: 5,
//         eventType: "error",
//         eventData: "Permission denied while accessing system file",
//         source: "System",
//         timestamp: "2025-08-04 10:22:18",
//         relatedFileId: {
//             id: 1005,
//             fileSystemId: "fs4",
//             filePath: "/var/log/system.log",
//             fileName: "system.log",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10005,
//             pid: 8765,
//             executablePath: "/usr/bin/tail"
//         }
//     },
//     {
//         id: 6,
//         eventType: "access",
//         eventData: "Database connection established",
//         source: "Service",
//         timestamp: "2025-08-04 09:30:55",
//         relatedFileId: {
//             id: 1006,
//             fileSystemId: "fs5",
//             filePath: "/var/lib/mysql/data.db",
//             fileName: "data.db",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10006,
//             pid: 3456,
//             executablePath: "/usr/bin/mysqld"
//         }
//     },
//     {
//         id: 7,
//         eventType: "creation",
//         eventData: "Log rotation created new file",
//         source: "System",
//         timestamp: "2025-08-04 08:45:33",
//         relatedFileId: {
//             id: 1007,
//             fileSystemId: "fs3",
//             filePath: "/var/log/app.log.1",
//             fileName: "app.log.1",
//             status: "archived"
//         },
//         relatedProcessId: {
//             id: 10007,
//             pid: 7890,
//             executablePath: "/usr/sbin/logrotate"
//         }
//     },
//     {
//         id: 8,
//         eventType: "modification",
//         eventData: "User profile settings changed",
//         source: "User",
//         timestamp: "2025-08-04 07:20:11",
//         relatedFileId: {
//             id: 1008,
//             fileSystemId: "fs1",
//             filePath: "/home/user/.bashrc",
//             fileName: ".bashrc",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10008,
//             pid: 2345,
//             executablePath: "/bin/bash"
//         }
//     },
//     {
//         id: 9,
//         eventType: "deletion",
//         eventData: "Old backup files cleaned up",
//         source: "Service",
//         timestamp: "2025-08-03 23:55:42",
//         relatedFileId: {
//             id: 1009,
//             fileSystemId: "fs6",
//             filePath: "/backup/old/backup_20250701.tar.gz",
//             fileName: "backup_20250701.tar.gz",
//             status: "deleted"
//         },
//         relatedProcessId: {
//             id: 10009,
//             pid: 6789,
//             executablePath: "/usr/bin/find"
//         }
//     },
//     {
//         id: 10,
//         eventType: "access",
//         eventData: "Web server processing request",
//         source: "Service",
//         timestamp: "2025-08-03 22:10:28",
//         relatedFileId: {
//             id: 1010,
//             fileSystemId: "fs2",
//             filePath: "/var/www/html/index.html",
//             fileName: "index.html",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 10010,
//             pid: 1111,
//             executablePath: "/usr/bin/nginx"
//         }
//     },
//     {
//         id: 11,
//         eventType: "warning",
//         eventData: "Disk space running low on system drive",
//         source: "System",
//         timestamp: "2025-08-04 16:45:12",
//         relatedFileId: {
//             id: 2001,
//             fileSystemId: "fs1",
//             filePath: "/var/log/disk-monitor.log",
//             fileName: "disk-monitor.log",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20001,
//             pid: 1567,
//             executablePath: "/usr/bin/df"
//         }
//     },
//     {
//         id: 12,
//         eventType: "access",
//         eventData: "SSH login attempt from unknown IP",
//         source: "Security",
//         timestamp: "2025-08-04 15:30:45",
//         relatedFileId: {
//             id: 2002,
//             fileSystemId: "fs2",
//             filePath: "/var/log/auth.log",
//             fileName: "auth.log",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20002,
//             pid: 2234,
//             executablePath: "/usr/sbin/sshd"
//         }
//     },
//     {
//         id: 13,
//         eventType: "creation",
//         eventData: "New user account created",
//         source: "User",
//         timestamp: "2025-08-04 14:15:33",
//         relatedFileId: {
//             id: 2003,
//             fileSystemId: "fs1",
//             filePath: "/etc/passwd",
//             fileName: "passwd",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20003,
//             pid: 3456,
//             executablePath: "/usr/sbin/useradd"
//         }
//     },
//     {
//         id: 14,
//         eventType: "error",
//         eventData: "Failed to connect to external API",
//         source: "Application",
//         timestamp: "2025-08-04 13:42:18",
//         relatedFileId: {
//             id: 2004,
//             fileSystemId: "fs3",
//             filePath: "/var/log/app/api-errors.log",
//             fileName: "api-errors.log",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20004,
//             pid: 4567,
//             executablePath: "/usr/bin/node"
//         }
//     },
//     {
//         id: 15,
//         eventType: "modification",
//         eventData: "System crontab updated",
//         source: "User",
//         timestamp: "2025-08-04 12:25:44",
//         relatedFileId: {
//             id: 2005,
//             fileSystemId: "fs2",
//             filePath: "/etc/crontab",
//             fileName: "crontab",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20005,
//             pid: 5678,
//             executablePath: "/usr/bin/crontab"
//         }
//     },
//     {
//         id: 16,
//         eventType: "deletion",
//         eventData: "Old application logs purged",
//         source: "Service",
//         timestamp: "2025-08-04 11:10:22",
//         relatedFileId: {
//             id: 2006,
//             fileSystemId: "fs4",
//             filePath: "/var/log/app/old-logs/",
//             fileName: "app.log.old",
//             status: "deleted"
//         },
//         relatedProcessId: {
//             id: 20006,
//             pid: 6789,
//             executablePath: "/usr/bin/logrotate"
//         }
//     },
//     {
//         id: 17,
//         eventType: "access",
//         eventData: "Database query executed",
//         source: "Application",
//         timestamp: "2025-08-04 10:55:17",
//         relatedFileId: {
//             id: 2007,
//             fileSystemId: "fs5",
//             filePath: "/var/lib/postgresql/data/",
//             fileName: "postgresql.log",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20007,
//             pid: 7890,
//             executablePath: "/usr/lib/postgresql/bin/postgres"
//         }
//     },
//     {
//         id: 18,
//         eventType: "warning",
//         eventData: "High CPU usage detected",
//         source: "System",
//         timestamp: "2025-08-04 09:40:55",
//         relatedFileId: {
//             id: 2008,
//             fileSystemId: "fs1",
//             filePath: "/proc/stat",
//             fileName: "stat",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20008,
//             pid: 8901,
//             executablePath: "/usr/bin/top"
//         }
//     },
//     {
//         id: 19,
//         eventType: "creation",
//         eventData: "Backup file created successfully",
//         source: "Service",
//         timestamp: "2025-08-04 08:20:33",
//         relatedFileId: {
//             id: 2009,
//             fileSystemId: "fs6",
//             filePath: "/backup/daily/backup_20250804.tar.gz",
//             fileName: "backup_20250804.tar.gz",
//             status: "archived"
//         },
//         relatedProcessId: {
//             id: 20009,
//             pid: 9012,
//             executablePath: "/usr/bin/tar"
//         }
//     },
//     {
//         id: 20,
//         eventType: "error",
//         eventData: "Memory allocation failed",
//         source: "Application",
//         timestamp: "2025-08-04 07:15:41",
//         relatedFileId: {
//             id: 2010,
//             fileSystemId: "fs3",
//             filePath: "/var/log/kern.log",
//             fileName: "kern.log",
//             status: "active"
//         },
//         relatedProcessId: {
//             id: 20010,
//             pid: 1023,
//             executablePath: "/usr/bin/java"
//         }
//     }
// ];
