require 'spec_helper'

describe Highlight do

  let(:highlight) { build(:highlight) }
  let(:active_highlight) { build(:highlight, start_at: Date.tomorrow, end_at: 2.days.since) }

  it "should be valid" do
    highlight.should be_valid
  end

  it "should be active" do
    active_highlight.should_not be_disabled
  end

  it "should disable a highlight" do
    active_highlight.disable!
    active_highlight.should be_disabled
  end

  context "finder" do
    before(:each) do
      active_highlight.save!
    end

    it "should find the active highlight" do
      Highlight.active.should have(1).elements
    end
  end
end
