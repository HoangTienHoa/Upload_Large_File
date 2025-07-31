# Upload_Large_File
Demo send Large file via internet.

Note: This is 2 step:
  Front-end
    #1 Chunk large file to small file.
    #2 Named Chunk file with increment index.
    #3 Send files to server
    #4 Tạo check sum for verify later
  Back-end
    #1 Get all the files
    #2 Sort asc by name + index
    #3 Merge file
    #4 Check Checksum
Use fs.createReadStream/fs.createWriteStream for:
  Read small data by chunk then Consum small RAM.
  This Asyn actions so will make the process faster
Run:
#1 Copy .zip file that you want to upload to porject folder.
#2 Change file name is "largefile.zip"
#3 run node split.js for split the "largefile.zip" file to small file at /chunks 
#4 run node merge.js for merch file chunks become mergedfile.zip
