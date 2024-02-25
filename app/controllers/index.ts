import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked postTypes: string[] = [
    'pin',
    'instagram_media',
    'youtube_video',
    'article',
    'tweet',
    'facebook_status',
  ];
}
