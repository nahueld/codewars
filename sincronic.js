private async processNextListElement(objectToBackUp:string, lastKey: string, gzip: zlib.Gzip): Promise<number> {
  //not sure how this object is
  try {
    let data = await admin.database().ref(objectToBackUp)
                          .limitToFirst(100)
                          .startAt(lastKey)
                          .once('value', this.firebaseListExtractionCallback);
    let gzipWrite = this.writeToGzip(data, gzip);
    if (BACKUP_SERVICE_ERRORS.SUCCESS === gzipWrite) {
      return data.value.length === 100 ?
        this.processNextListElement(objectToBackUp, data.lastKey, gzip) :
        BACKUP_SERVICE_ERRORS.SUCCESS;
    } else {
      return gzipWrite;
    }
  }catch(error) {
    return BACKUP_SERVICE_ERRORS.ERROR_READING_FROM_DB;
  }
}
