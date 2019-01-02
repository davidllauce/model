<?php

namespace MODEL\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use MODEL\User;

class MailNotification extends Notification
{
    use Queueable;

    protected $user; // User data
    protected $configMail; // email configuration

    /**
     * Create a new notification instance.
     *
     * @param User $user
     * @param [array:template,subject] $mail
     * @return void
     */
    
    public function __construct(User $user, $configMail)
    {
        $this->user = $user;
        $this->configMail = $configMail;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject($this->configMail['subject'])
                    ->view('mail.'.$this->configMail['template'],['user'=>$this->user]);
    }

    
}
