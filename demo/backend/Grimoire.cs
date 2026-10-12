using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreatDreamer.Demo
{
    public enum Visibility { NakedEye, Telescope }

    public record Cultist(string Name, string City, double Sanity = 100.0);

    public interface IRitual<T> where T : class
    {
        Task<bool> SummonAsync(T who);
    }

    public class Ritual : IRitual<Cultist>
    {
        private const int Depth = 47;
        private readonly List<Cultist> _cultists = new();

        public string? Chant { get; init; }

        #region Summoning
        /// <summary>
        /// Summons a cultist and reports whether they kept their sanity.
        /// </summary>
        /// <param name="who">The cultist who reads aloud.</param>
        /// <returns><c>true</c> when the ritual succeeds.</returns>
        public async Task<bool> SummonAsync(Cultist who)
        {
            _cultists.Add(who with { Sanity = who.Sanity - 10.5 });
            await Task.Delay(TimeSpan.FromMilliseconds(Depth));
            return who is { Sanity: > 10 } && Chant is not null;
        }
        #endregion

        [Obsolete("Use SummonAsync instead.")]
        public bool Summon(Cultist who) => SummonAsync(who).Result;

        public string Describe(Visibility visibility) => visibility switch
        {
            Visibility.NakedEye => $"Look up, {Chant ?? "dreamer"}!",
            Visibility.Telescope => @"Point the scope at C:\stars",
            _ => throw new ArgumentOutOfRangeException(nameof(visibility)),
        };

        public IEnumerable<string> FromDunwich() =>
            from c in _cultists
            where c.City == "Dunwich" && c.Sanity >= 10
            orderby c.Sanity descending
            select c.Name.ToUpperInvariant();

        public static void Main()
        {
            var ritual = new Ritual { Chant = "Ph'nglui" };
            var wilbur = new Cultist("Wilbur", "Dunwich");
            // A normal comment
            Console.WriteLine(ritual.SummonAsync(wilbur).Result ? '\u2726' : 'x');
            Console.WriteLine(string.Join(", ", ritual.FromDunwich()), typeof(Ritual).Name);
        }
    }
}
