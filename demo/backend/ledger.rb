# The Great Dreamer: Ruby
require 'json'

module Arkham
  DEPTH = 47
  SIGIL = /\Aph'nglui\s+(?<name>\w+)/i

  class Cultist < Struct.new(:name, :city)
    include Comparable
    attr_accessor :sanity
    attr_reader :tags

    @@count = 2

    def initialize(name, city = 'Dunwich', **options)
      super(name, city)
      @sanity = options.fetch(:sanity, 100)
      @tags = %i[dreamer acolyte]
      @@count += 1
    end

    def self.count
      @@count
    end

    def <=>(other)
      sanity <=> other.sanity
    end

    def dream(hours = 8)
      @sanity -= hours * 1.5
      raise ArgumentError, "#{name} has seen too much\n" if @sanity < 10
      yield self if block_given?
      self
    end

    def to_h
      { name: name, city: city, sanity: sanity, 'depth' => DEPTH }
    end

    private

    def whisper(*words, loud: false)
      text = words.map(&:to_s).join(' ')
      loud ? text.upcase : text
      puts text
    end
  end
end

chant = "ph'nglui wilbur"
name = chant[Arkham::SIGIL, :name] || 'nobody'
wilbur = Arkham::Cultist.new(name.capitalize, sanity: 60)

wilbur.dream(4) do |c|
  puts "#{c.name} dreams of R'lyeh at #{Arkham::DEPTH} degrees"
end

notes = <<~TEXT
  Cultists: #{Arkham::Cultist.count}
  Sanity:   #{wilbur.sanity.round(1)}
TEXT

puts notes, wilbur.to_h.to_json, [1, 2, 3].select(&:odd?).inspect
puts :symbol, /rlyeh #{name}/x.source, nil.to_a.empty?
