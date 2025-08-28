const resultRelations = [
  {
    file: {
      id: 1,
      "fileSystemId": "fs1",
      "inode": 1001,
      "filePath": "/data/source/config.json",
      "fileName": "config.json",
      "fileSize": 2048,
      "createdAt": "2025-07-04T11:27:24.000Z",
      "modifiedAt": "2025-08-08T09:18:17.000Z",
      "isOriginalMarked": true,
      "maxChainDepth": 0,
      "minChainDepth": 0,
      "status": "active",
      "extendedAttributes": "{\"type\":\"config\"}"
    },
    "edges": [
      {
        "type": "cached",
        "to": {
          "file": {
            "id": 4,
            "fileSystemId": "fs1",
            "inode": 2001,
            "filePath": "/tmp/config.cache",
            "fileName": "config.cache",
            "fileSize": 1024,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-08-07T16:10:08.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"source\":\"config.json\"}"
          },
          "edges": [
            {
              "type": "transformed",
              "to": {
                "file": {
                  "id": 8,
                  "fileSystemId": "fs1",
                  "inode": 3001,
                  "filePath": "/home/devuser/custom_config.json",
                  "fileName": "custom_config.json",
                  "fileSize": 3072,
                  "createdAt": "2025-07-04T11:27:24.000Z",
                  "modifiedAt": "2025-07-04T11:27:24.000Z",
                  "isOriginalMarked": false,
                  "maxChainDepth": 0,
                  "minChainDepth": 0,
                  "status": "active",
                  "extendedAttributes": "{\"custom\":\"true\"}"
                },
                "edges": [
                  {
                    "type": "resolved",
                    "to": {
                      "file": {
                        "id": 12,
                        "fileSystemId": "fs1",
                        "inode": 4002,
                        "filePath": "/etc/app_settings.json",
                        "fileName": "app_settings.json",
                        "fileSize": 4096,
                        "createdAt": "2025-07-04T11:27:24.000Z",
                        "modifiedAt": "2025-08-07T16:10:31.000Z",
                        "isOriginalMarked": false,
                        "maxChainDepth": 0,
                        "minChainDepth": 0,
                        "status": "active",
                        "extendedAttributes": "{\"settings\":\"true\"}"
                      },
                      "edges": []
                    },
                    "createdAt": "2025-07-04T11:27:24.000Z"
                  }
                ]
              },
              "createdAt": "2025-07-04T11:27:24.000Z"
            }
          ]
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "backup",
        "to": {
          "file": {
            "id": 5,
            "fileSystemId": "fs1",
            "inode": 2002,
            "filePath": "/backups/config.json.bak",
            "fileName": "config.json.bak",
            "fileSize": 2048,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-08-07T16:10:25.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"backup\":\"true\"}"
          },
          "edges": [
            {
              "type": "restored",
              "to": {
                "file": {
                  "id": 8,
                  "fileSystemId": "fs1",
                  "inode": 3001,
                  "filePath": "/home/devuser/custom_config.json",
                  "fileName": "custom_config.json",
                  "fileSize": 3072,
                  "createdAt": "2025-07-04T11:27:24.000Z",
                  "modifiedAt": "2025-07-04T11:27:24.000Z",
                  "isOriginalMarked": false,
                  "maxChainDepth": 0,
                  "minChainDepth": 0,
                  "status": "active",
                  "extendedAttributes": "{\"custom\":\"true\"}"
                },
                "edges": [
                  {
                    "type": "resolved",
                    "to": {
                      "file": {
                        "id": 12,
                        "fileSystemId": "fs1",
                        "inode": 4002,
                        "filePath": "/etc/app_settings.json",
                        "fileName": "app_settings.json",
                        "fileSize": 4096,
                        "createdAt": "2025-07-04T11:27:24.000Z",
                        "modifiedAt": "2025-08-07T16:10:31.000Z",
                        "isOriginalMarked": false,
                        "maxChainDepth": 0,
                        "minChainDepth": 0,
                        "status": "active",
                        "extendedAttributes": "{\"settings\":\"true\"}"
                      },
                      "edges": []
                    },
                    "createdAt": "2025-07-04T11:27:24.000Z"
                  }
                ]
              },
              "createdAt": "2025-07-04T11:27:24.000Z"
            }
          ]
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "inherited",
        "to": {
          "file": {
            "id": 8,
            "fileSystemId": "fs1",
            "inode": 3001,
            "filePath": "/home/devuser/custom_config.json",
            "fileName": "custom_config.json",
            "fileSize": 3072,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"custom\":\"true\"}"
          },
          "edges": [
            {
              "type": "resolved",
              "to": {
                "file": {
                  "id": 12,
                  "fileSystemId": "fs1",
                  "inode": 4002,
                  "filePath": "/etc/app_settings.json",
                  "fileName": "app_settings.json",
                  "fileSize": 4096,
                  "createdAt": "2025-07-04T11:27:24.000Z",
                  "modifiedAt": "2025-08-07T16:10:31.000Z",
                  "isOriginalMarked": false,
                  "maxChainDepth": 0,
                  "minChainDepth": 0,
                  "status": "active",
                  "extendedAttributes": "{\"settings\":\"true\"}"
                },
                "edges": []
              },
              "createdAt": "2025-07-04T11:27:24.000Z"
            }
          ]
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "config",
        "to": {
          "file": {
            "id": 12,
            "fileSystemId": "fs1",
            "inode": 4002,
            "filePath": "/etc/app_settings.json",
            "fileName": "app_settings.json",
            "fileSize": 4096,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-08-07T16:10:31.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"settings\":\"true\"}"
          },
          "edges": []
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      }
    ]
  },
  {
    "file": {
      "id": 2,
      "fileSystemId": "fs1",
      "inode": 1002,
      "filePath": "/data/source/main.exe",
      "fileName": "main.exe",
      "fileSize": 102400,
      "createdAt": "2025-07-04T11:27:24.000Z",
      "modifiedAt": "2025-08-07T16:13:01.000Z",
      "isOriginalMarked": true,
      "maxChainDepth": 0,
      "minChainDepth": 0,
      "status": "archived",
      "extendedAttributes": "{\"type\":\"binary\"}"
    },
    "edges": [
      {
        "type": "running",
        "to": {
          "file": {
            "id": 6,
            "fileSystemId": "fs1",
            "inode": 2003,
            "filePath": "/proc/main_running",
            "fileName": "main_running",
            "fileSize": 0,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-08-08T09:18:34.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "deleted",
            "extendedAttributes": "{\"runtime\":\"true\"}"
          },
          "edges": [
            {
              "type": "debug",
              "to": {
                "file": {
                  "id": 9,
                  "fileSystemId": "fs1",
                  "inode": 3002,
                  "filePath": "/tmp/main_patched",
                  "fileName": "main_patched",
                  "fileSize": 51200,
                  "createdAt": "2025-07-04T11:27:24.000Z",
                  "modifiedAt": "2025-07-04T11:27:24.000Z",
                  "isOriginalMarked": false,
                  "maxChainDepth": 0,
                  "minChainDepth": 0,
                  "status": "active",
                  "extendedAttributes": "{\"patched\":\"true\"}"
                },
                "edges": [
                  {
                    "type": "compiled",
                    "to": {
                      "file": {
                        "id": 11,
                        "fileSystemId": "fs1",
                        "inode": 4001,
                        "filePath": "/dist/final_app",
                        "fileName": "final_app",
                        "fileSize": 204800,
                        "createdAt": "2025-07-04T11:27:24.000Z",
                        "modifiedAt": "2025-07-16T10:33:41.000Z",
                        "isOriginalMarked": false,
                        "maxChainDepth": 0,
                        "minChainDepth": 0,
                        "status": "active",
                        "extendedAttributes": "{\"final\":\"true\"}"
                      },
                      "edges": []
                    },
                    "createdAt": "2025-07-04T11:27:24.000Z"
                  }
                ]
              },
              "createdAt": "2025-07-04T11:27:24.000Z"
            }
          ]
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "patched",
        "to": {
          "file": {
            "id": 9,
            "fileSystemId": "fs1",
            "inode": 3002,
            "filePath": "/tmp/main_patched",
            "fileName": "main_patched",
            "fileSize": 51200,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"patched\":\"true\"}"
          },
          "edges": [
            {
              "type": "compiled",
              "to": {
                "file": {
                  "id": 11,
                  "fileSystemId": "fs1",
                  "inode": 4001,
                  "filePath": "/dist/final_app",
                  "fileName": "final_app",
                  "fileSize": 204800,
                  "createdAt": "2025-07-04T11:27:24.000Z",
                  "modifiedAt": "2025-07-16T10:33:41.000Z",
                  "isOriginalMarked": false,
                  "maxChainDepth": 0,
                  "minChainDepth": 0,
                  "status": "active",
                  "extendedAttributes": "{\"final\":\"true\"}"
                },
                "edges": []
              },
              "createdAt": "2025-07-04T11:27:24.000Z"
            }
          ]
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "bundled",
        "to": {
          "file": {
            "id": 11,
            "fileSystemId": "fs1",
            "inode": 4001,
            "filePath": "/dist/final_app",
            "fileName": "final_app",
            "fileSize": 204800,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-16T10:33:41.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"final\":\"true\"}"
          },
          "edges": []
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      }
    ]
  },
  {
    "file": {
      "id": 3,
      "fileSystemId": "fs1",
      "inode": 1003,
      "filePath": "/data/source/lib.so",
      "fileName": "lib.so",
      "fileSize": 51200,
      "createdAt": "2025-07-04T11:27:24.000Z",
      "modifiedAt": "2025-08-07T16:15:02.000Z",
      "isOriginalMarked": true,
      "maxChainDepth": 0,
      "minChainDepth": 0,
      "status": "active",
      "extendedAttributes": "{\"type\":\"library\"}"
    },
    "edges": [
      {
        "type": "modified",
        "to": {
          "file": {
            "id": 7,
            "fileSystemId": "fs1",
            "inode": 2004,
            "filePath": "/var/lib/lib_modified.so",
            "fileName": "lib_modified.so",
            "fileSize": 25600,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-04T11:27:24.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"modified\":\"true\"}"
          },
          "edges": [
            {
              "type": "optimized",
              "to": {
                "file": {
                  "id": 9,
                  "fileSystemId": "fs1",
                  "inode": 3002,
                  "filePath": "/tmp/main_patched",
                  "fileName": "main_patched",
                  "fileSize": 51200,
                  "createdAt": "2025-07-04T11:27:24.000Z",
                  "modifiedAt": "2025-07-04T11:27:24.000Z",
                  "isOriginalMarked": false,
                  "maxChainDepth": 0,
                  "minChainDepth": 0,
                  "status": "active",
                  "extendedAttributes": "{\"patched\":\"true\"}"
                },
                "edges": [
                  {
                    "type": "compiled",
                    "to": {
                      "file": {
                        "id": 11,
                        "fileSystemId": "fs1",
                        "inode": 4001,
                        "filePath": "/dist/final_app",
                        "fileName": "final_app",
                        "fileSize": 204800,
                        "createdAt": "2025-07-04T11:27:24.000Z",
                        "modifiedAt": "2025-07-16T10:33:41.000Z",
                        "isOriginalMarked": false,
                        "maxChainDepth": 0,
                        "minChainDepth": 0,
                        "status": "active",
                        "extendedAttributes": "{\"final\":\"true\"}"
                      },
                      "edges": []
                    },
                    "createdAt": "2025-07-04T11:27:24.000Z"
                  }
                ]
              },
              "createdAt": "2025-07-04T11:27:24.000Z"
            }
          ]
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "linked",
        "to": {
          "file": {
            "id": 10,
            "fileSystemId": "fs1",
            "inode": 3003,
            "filePath": "/cache/lib_optimized.so",
            "fileName": "lib_optimized.so",
            "fileSize": 12800,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-28T15:53:25.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"optimized\":\"true\"}"
          },
          "edges": []
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      },
      {
        "type": "embedded",
        "to": {
          "file": {
            "id": 11,
            "fileSystemId": "fs1",
            "inode": 4001,
            "filePath": "/dist/final_app",
            "fileName": "final_app",
            "fileSize": 204800,
            "createdAt": "2025-07-04T11:27:24.000Z",
            "modifiedAt": "2025-07-16T10:33:41.000Z",
            "isOriginalMarked": false,
            "maxChainDepth": 0,
            "minChainDepth": 0,
            "status": "active",
            "extendedAttributes": "{\"final\":\"true\"}"
          },
          "edges": []
        },
        "createdAt": "2025-07-04T11:27:24.000Z"
      }
    ]
  }
]