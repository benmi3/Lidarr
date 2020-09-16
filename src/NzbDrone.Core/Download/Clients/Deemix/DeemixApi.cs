using System.Collections.Generic;
using Newtonsoft.Json;

namespace NzbDrone.Core.Download.Clients.Deemix
{
    public class DeemixQueueItem
    {
        public string Title { get; set; }
        public string Artist { get; set; }
        public string Cover { get; set; }
        public int Size { get; set; }
        public string Path { get; set; }
        public int Downloaded { get; set; }
        public bool Failed { get; set; }
        public List<object> Errors { get; set; }
        public int Progress { get; set; }
        public List<string> Files { get; set; }
        public string Type { get; set; }
        public string Id { get; set; }
        public string Bitrate { get; set; }
        public string Uuid { get; set; }
        public int Ack { get; set; }
    }

    public class DeemixQueueUpdate
    {
        public string Uuid { get; set; }
        public string DownloadPath { get; set; }
        public int? Progress { get; set; }
    }

    public class DeemixQueue
    {
        public List<string> Queue { get; set; }
        public List<string> QueueComplete { get; set; }
        public Dictionary<string, DeemixQueueItem> QueueList { get; set; }
        public string CurrentItem { get; set; }
    }

    public class DeemixArtist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public string Type { get; set; }
    }

    public class DeemixAlbum
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        [JsonProperty("nb_tracks")]
        public int NbTracks { get; set; }
        [JsonProperty("record_type")]
        public string RecordType { get; set; }
        public string Tracklist { get; set; }
        [JsonProperty("explicit_lyrics")]
        public bool ExplicitLyrics { get; set; }
        public DeemixArtist Artist { get; set; }
        public string Type { get; set; }
    }

    public class DeemixSearchResponse
    {
        public IList<DeemixAlbum> Data { get; set; }
        public int Total { get; set; }
        public string Next { get; set; }
        public int Ack { get; set; }
    }
}
