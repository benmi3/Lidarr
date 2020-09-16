using System;
using System.Collections.Generic;
using System.Linq;
using NzbDrone.Core.Download.Clients.Deemix;
using NzbDrone.Core.Parser.Model;

namespace NzbDrone.Core.Indexers.Deemix
{
    public static class DeemixParser
    {
        private static readonly int[] _bitrates = new[] { 1, 3, 9 };

        public static IList<ReleaseInfo> ParseResponse(DeemixSearchResponse response)
        {
            var torrentInfos = new List<ReleaseInfo>();

            if (response?.Data == null ||
                response.Total == 0)
            {
                return torrentInfos;
            }

            foreach (var result in response.Data)
            {
                foreach (var bitrate in _bitrates)
                {
                    torrentInfos.Add(ToReleaseInfo(result, bitrate));
                }
            }

            // order by date
            return
                torrentInfos
                    .OrderByDescending(o => o.Size)
                    .ToArray();
        }

        private static ReleaseInfo ToReleaseInfo(DeemixAlbum x, int bitrate)
        {
            var result = new ReleaseInfo
            {
                Guid = $"Deemix-{x.Id}-{bitrate}",
                Artist = x.Artist.Name,
                Album = x.Title,
                DownloadUrl = x.Link,
                InfoUrl = x.Link,
                PublishDate = DateTime.UtcNow,
                DownloadProtocol = DownloadProtocol.Deemix
            };

            int trackMb;
            string format;
            switch (bitrate)
            {
                case 9:
                    trackMb = 30;
                    result.Codec = "FLAC";
                    result.Container = "Lossless";
                    format = "FLAC";
                    break;
                case 3:
                    trackMb = 5;
                    result.Codec = "MP3";
                    result.Container = "320";
                    format = "MP3 320";
                    break;
                case 1:
                    trackMb = 3;
                    result.Codec = "MP3";
                    result.Container = "128";
                    format = "MP3 128";
                    break;
                default:
                    throw new NotImplementedException();
            }

            result.Size = x.NbTracks * trackMb * 1024 * 1024;
            result.Title = $"{x.Artist.Name} - {x.Title} [WEB] [{format}]";

            if (x.ExplicitLyrics)
            {
                result.Title += " [Explicit]";
            }

            return result;
        }
    }
}
