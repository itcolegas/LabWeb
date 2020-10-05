import sys
import pymongo


uri = "mongodb+srv://admin:Sabrina1998@cluster0.ajf2k.mongodb.net/cluster0?retryWrites=true&w=majority"

###############################################################################
# main
###############################################################################

def main(args):

    SEED_DATA = [
        {        'decade': '1970s',        'artist': 'Debby Boone',        'song': 'You Light Up My Life',        'weeksAtOne': 10    },    {        'decade': '1980s',        'artist': 'Olivia Newton-John',        'song': 'Physical',        'weeksAtOne': 10    },    {        'decade': '1990s',        'artist': 'Mariah Carey',        'song': 'One Sweet Day',        'weeksAtOne': 16    }]

    client = pymongo.MongoClient(uri)

    db = client.get_default_database()

    songs = db['songs']

    songs.insert_many(SEED_DATA)

    query = {'song': 'One Sweet Day'}

    songs.update(query, {'$set': {'artist': 'Mariah Carey ft. Boyz II Men'}})

    cursor = songs.find({'weeksAtOne': {'$gte': 10}}).sort('decade', 1)

    for doc in cursor:
        print ('In the %s, %s by %s topped the charts for %d straight weeks.' %
               (doc['decade'], doc['song'], doc['artist'], doc['weeksAtOne']))


    client.close()


if __name__ == '__main__':
    main(sys.argv[1:])
