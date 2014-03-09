class CreateCouponMails < ActiveRecord::Migration
  def change
    create_table :coupon_mails do |t|
      t.string :email

      t.timestamps
    end
  end
end
